import {
  createApp,
  reactive,
} from 'https://unpkg.com/vue@3.2.45/dist/vue.esm-browser.js'

const Home = {
  data() {
    return {
      inputValue: '',
      responseData: '',
      isBold: false,
    }
  },
  methods: {
    async getData() {
      const res = await fetch('/to-olde', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: `{"text": "${this.inputValue}", "is_bold": ${this.isBold}}`,
      }).then((r) => r.json())

      this.responseData = res.text
    },
  },
  template: `
<div class="card">
  <p>Just type and 𝕺𝖑𝖉𝖊 𝕰𝖓𝖌𝖑𝖎𝖘𝖍 will show below</p>
  <input type="text" v-model="inputValue" @input="getData"/>
  <label for="is_bold">Is bold?
    <input type="checkbox" id="is_bold" name="is_bold" v-model="isBold" />
  </label>
  <h1>{{ responseData }}</h1>
</div>
`,
}

createApp(Home).mount('#app')
