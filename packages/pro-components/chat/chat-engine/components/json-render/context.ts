import {
  computed,
  defineComponent,
  inject,
  provide,
  ref,
  shallowRef,
  type ComputedRef,
  type InjectionKey,
  type PropType,
  type Ref,
} from 'vue';
import { cloneDeep } from 'lodash-es';
import {
  evaluateVisibility,
  executeAction as executeCoreAction,
  getByPath,
  resolveAction,
  runValidation,
  setByPath as setByPathMutable,
  type ActionBinding,
  type StateModel,
  type ValidationConfig,
  type ValidationFunction,
  type ValidationResult,
  type VisibilityCondition,
} from '@json-render/core';
import type { ActionHandlers } from './types';

export class JsonRenderDataStore {
  readonly data: Ref<StateModel>;
  private onDataChange?: (path: string, value: unknown) => void;

  constructor(initialData: StateModel = {}, onDataChange?: (path: string, value: unknown) => void) {
    this.data = shallowRef(cloneDeep(initialData));
    this.onDataChange = onDataChange;
  }

  getData() {
    return this.data.value;
  }

  getByPath(path?: string) {
    return path ? getByPath(this.data.value, path) : undefined;
  }

  setByPath(path: string, value: unknown) {
    const next = cloneDeep(this.data.value);
    setByPathMutable(next, path, value);
    this.data.value = next;
    this.onDataChange?.(path, value);
  }

  replaceData(data: StateModel = {}) {
    this.data.value = cloneDeep(data);
  }

  setOnDataChange(callback?: (path: string, value: unknown) => void) {
    this.onDataChange = callback;
  }
}

export interface JsonRenderActionContext {
  loadingActions: Ref<Set<string>>;
  execute: (action: ActionBinding) => Promise<void>;
}

const DataStoreKey: InjectionKey<JsonRenderDataStore> = Symbol('JsonRenderDataStore');
const ActionContextKey: InjectionKey<JsonRenderActionContext> = Symbol('JsonRenderActionContext');

export const provideJsonRenderData = (store: JsonRenderDataStore) => {
  provide(DataStoreKey, store);
};

export const useDataStore = () => {
  const store = inject(DataStoreKey);
  if (!store) throw new Error('useDataStore must be used within a json-render renderer');
  return store;
};

export const useDataValue = <T = unknown>(path?: string): ComputedRef<T | undefined> => {
  const store = useDataStore();
  return computed(() => store.getByPath(path) as T | undefined);
};

export const useDataBinding = <T = unknown>(path?: string): [ComputedRef<T | undefined>, (value: T) => void] => {
  const store = useDataStore();
  return [useDataValue<T>(path), (value: T) => path && store.setByPath(path, value)];
};

export const useDataState = () => {
  const store = useDataStore();
  return {
    data: store.data,
  };
};

export const useDataUpdate = () => {
  const store = useDataStore();
  return (updates: Record<string, unknown>) => {
    Object.entries(updates).forEach(([path, value]) => store.setByPath(path, value));
  };
};

export const provideJsonRenderActions = (
  store: JsonRenderDataStore,
  handlers: ActionHandlers = {},
  navigate?: (path: string) => void,
): JsonRenderActionContext => {
  const loadingActions = ref(new Set<string>());

  const execute = async (action: ActionBinding) => {
    const resolved = resolveAction(action, store.getData());
    const handler = handlers[resolved.action];
    if (!handler) {
      console.warn(`[json-render] No handler registered for action: ${resolved.action}`);
      return;
    }

    if (resolved.confirm && typeof window !== 'undefined') {
      const accepted = window.confirm(resolved.confirm.message || resolved.confirm.title);
      if (!accepted) return;
    }

    loadingActions.value = new Set(loadingActions.value).add(resolved.action);
    try {
      await executeCoreAction({
        action: resolved,
        handler,
        setState: (path, value) => store.setByPath(path, value),
        navigate,
        executeAction: async (name) => execute({ action: name }),
      });
    } finally {
      const next = new Set(loadingActions.value);
      next.delete(resolved.action);
      loadingActions.value = next;
    }
  };

  const context = { loadingActions, execute };
  provide(ActionContextKey, context);
  return context;
};

export const useActions = () => {
  const context = inject(ActionContextKey);
  if (!context) throw new Error('useActions must be used within a json-render renderer');
  return context;
};

export const useAction = (action: ActionBinding) => {
  const { execute, loadingActions } = useActions();
  return {
    execute: () => execute(action),
    isLoading: computed(() => loadingActions.value.has(action.action)),
  };
};

export const useIsVisible = (condition?: VisibilityCondition) => {
  const store = useDataStore();
  return computed(() =>
    evaluateVisibility(condition, {
      stateModel: store.data.value,
    }),
  );
};

export interface FieldValidationState {
  touched: boolean;
  validated: boolean;
  result: ValidationResult | null;
}

export interface ValidationContextValue {
  customFunctions: Record<string, ValidationFunction>;
  fieldStates: Ref<Record<string, FieldValidationState>>;
  validate: (path: string, config: ValidationConfig) => ValidationResult;
  touch: (path: string) => void;
  clear: (path: string) => void;
  validateAll: () => boolean;
  registerField: (path: string, config: ValidationConfig) => void;
}

const ValidationContextKey: InjectionKey<ValidationContextValue> = Symbol('JsonRenderValidation');

export const provideJsonRenderValidation = (
  customFunctions: Record<string, ValidationFunction> = {},
  dataStore?: JsonRenderDataStore,
): ValidationContextValue => {
  const store = dataStore || useDataStore();
  const fieldStates = ref<Record<string, FieldValidationState>>({});
  const fieldConfigs = new Map<string, ValidationConfig>();

  const validate = (path: string, config: ValidationConfig) => {
    const result = runValidation(config, {
      value: store.getByPath(path),
      stateModel: store.getData(),
      customFunctions,
    });
    fieldStates.value = {
      ...fieldStates.value,
      [path]: {
        touched: fieldStates.value[path]?.touched ?? true,
        validated: true,
        result,
      },
    };
    return result;
  };

  const context: ValidationContextValue = {
    customFunctions,
    fieldStates,
    validate,
    touch: (path) => {
      fieldStates.value = {
        ...fieldStates.value,
        [path]: {
          touched: true,
          validated: fieldStates.value[path]?.validated ?? false,
          result: fieldStates.value[path]?.result ?? null,
        },
      };
    },
    clear: (path) => {
      const next = { ...fieldStates.value };
      delete next[path];
      fieldStates.value = next;
    },
    validateAll: () => Array.from(fieldConfigs.entries()).every(([path, config]) => validate(path, config).valid),
    registerField: (path, config) => fieldConfigs.set(path, config),
  };
  provide(ValidationContextKey, context);
  return context;
};

export const ValidationProvider = defineComponent({
  name: 'JsonRenderValidationProvider',
  props: {
    customFunctions: {
      type: Object as PropType<Record<string, ValidationFunction>>,
      default: () => ({}),
    },
  },
  setup(props, { slots }) {
    provideJsonRenderValidation(props.customFunctions);
    return () => slots.default?.();
  },
});

export const useValidation = () => {
  const context = inject(ValidationContextKey);
  if (!context) throw new Error('useValidation must be used within ValidationProvider');
  return context;
};

export const useFieldValidation = (path: string, config?: ValidationConfig) => {
  const context = useValidation();
  if (config) context.registerField(path, config);
  const state = computed(
    () =>
      context.fieldStates.value[path] || {
        touched: false,
        validated: false,
        result: null,
      },
  );
  return {
    state,
    validate: () => context.validate(path, config || { checks: [] }),
    touch: () => context.touch(path),
    clear: () => context.clear(path),
    errors: computed(() => state.value.result?.errors || []),
    isValid: computed(() => state.value.result?.valid ?? true),
  };
};
