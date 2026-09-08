import { z } from 'zod';

export interface ComponentDoc {
  description: string;
  props: Record<string, string> | z.ZodObject<any>;
  hasChildren?: boolean;
}

export type PromptTemplateMode = 'default' | 'a2ui' | 'custom';

export interface CatalogPromptOptions {
  name?: string;
  components?: Record<string, ComponentDoc>;
  actions?: Record<string, { description: string }>;
  includeExample?: boolean;
  templateMode?: PromptTemplateMode;
  customTemplate?: (context: {
    name: string;
    components: Record<string, ComponentDoc>;
    actions: Record<string, { description: string }>;
  }) => string;
}

const builtinComponents: Record<string, ComponentDoc> = {
  Button: {
    description: 'TDesign button with action support',
    props: { label: 'string', theme: 'default | primary | success | warning | danger', action: 'ActionBinding' },
  },
  TextField: {
    description: 'Form field with JSON Pointer data binding',
    props: { label: 'string', valuePath: 'string', disabledPath: 'string (optional)', placeholder: 'string' },
  },
  Text: {
    description: 'Static or data-bound text',
    props: { content: 'string', contentPath: 'string (optional)' },
  },
  Card: { description: 'TDesign card container', props: { title: 'string', bordered: 'boolean' }, hasChildren: true },
  Row: { description: 'Horizontal grid row', props: { gutter: 'number', justify: 'string' }, hasChildren: true },
  Col: { description: 'Grid column', props: { span: 'number' }, hasChildren: true },
  Space: {
    description: 'Spacing layout',
    props: { direction: 'horizontal | vertical', size: 'string | number' },
    hasChildren: true,
  },
  Column: { description: 'Vertical layout', props: { gap: 'number', align: 'string' }, hasChildren: true },
  Divider: { description: 'Divider line', props: { layout: 'horizontal | vertical' } },
};

const builtinActions = {
  submit: { description: 'Submit form data to server' },
  reset: { description: 'Reset local form data' },
  cancel: { description: 'Cancel the current operation' },
};

const zodPropsToText = (schema: z.ZodObject<any>) =>
  Object.fromEntries(
    Object.entries(schema.shape).map(([name, rawType]) => {
      const type = rawType as z.ZodTypeAny;
      let description = 'unknown';
      if (type instanceof z.ZodString) description = 'string';
      if (type instanceof z.ZodNumber) description = 'number';
      if (type instanceof z.ZodBoolean) description = 'boolean';
      if (type instanceof z.ZodEnum) description = type.options.join(' | ');
      return [name, description];
    }),
  );

export const generateCatalogPrompt = (options: CatalogPromptOptions = {}) => {
  const name = options.name || 'tdesign';
  const components = { ...builtinComponents, ...(options.components || {}) };
  const actions = { ...builtinActions, ...(options.actions || {}) };

  if (options.templateMode === 'custom' && options.customTemplate) {
    return options.customTemplate({ name, components, actions });
  }

  const componentLines = Object.entries(components).flatMap(([componentName, definition]) => {
    const props = definition.props instanceof z.ZodObject ? zodPropsToText(definition.props) : definition.props;
    return [
      `### ${componentName}`,
      definition.description,
      `Props: ${Object.entries(props)
        .map(([prop, type]) => `${prop}: ${type}`)
        .join(', ')}`,
      definition.hasChildren ? 'Supports children.' : '',
    ].filter(Boolean);
  });
  const actionLines = Object.entries(actions).map(([action, definition]) => `- ${action}: ${definition.description}`);

  if (options.templateMode === 'a2ui') {
    return [
      `# ${name} A2UI Catalog`,
      'Return A2UI v0.9.1 newline-delimited JSON messages.',
      'Use createSurface, updateComponents, updateDataModel and deleteSurface.',
      'Components reference children by ID and bind data with {"path":"/data/key"}.',
      '',
      ...componentLines,
      '',
      '## Allowed actions',
      ...actionLines,
    ].join('\n');
  }

  return [
    `# ${name} json-render Catalog`,
    'Return a JSON object with root, elements and optional data fields.',
    'Each element contains type, props and optional children ID array.',
    '',
    ...componentLines,
    '',
    '## Allowed actions',
    ...actionLines,
  ].join('\n');
};

export const tdesignCatalog = {
  name: 'tdesign',
  components: builtinComponents,
  actions: builtinActions,
  componentNames: Object.keys(builtinComponents),
  actionNames: Object.keys(builtinActions),
};

export const createCustomCatalog = (options: CatalogPromptOptions) => ({
  name: options.name || 'tdesign-custom',
  components: { ...builtinComponents, ...(options.components || {}) },
  actions: { ...builtinActions, ...(options.actions || {}) },
  componentNames: Object.keys({ ...builtinComponents, ...(options.components || {}) }),
  actionNames: Object.keys({ ...builtinActions, ...(options.actions || {}) }),
});

export const tdesignComponentList = tdesignCatalog.componentNames;
export const tdesignActionList = tdesignCatalog.actionNames;
