import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FailSvg',
  render() {
    return (
      <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M24 6C14.0589 6 6 14.0589 6 24C6 33.9411 14.0589 42 24 42C33.9411 42 42 33.9411 42 24C42 14.0589 33.9411 6 24 6ZM2 24C2 11.8497 11.8497 2 24 2C36.1503 2 46 11.8497 46 24C46 36.1503 36.1503 46 24 46C11.8497 46 2 36.1503 2 24ZM26 13V28H22V13H26ZM22 31H26.0078V35.0078H22V31Z"
          fill="#D54941"
        />
      </svg>
    );
  },
});
