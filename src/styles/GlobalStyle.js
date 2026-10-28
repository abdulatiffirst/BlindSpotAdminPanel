import { createGlobalStyle } from 'styled-components'
import { theme as t } from './theme'

export default createGlobalStyle`
  *{box-sizing:border-box}
  body{margin:0;background:${t.bg};color:back;font:15px/1.45 'DM Sans',system-ui,sans-serif}
  button,input,select,textarea{font:inherit;color:inherit}
  :focus-visible{outline:1px solid ${t.accent};outline-offset:2px}
`
