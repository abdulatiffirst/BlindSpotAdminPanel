import styled from 'styled-components'
import { theme as t } from '@/styles/theme'

const Shade = styled.div`position:fixed;inset:0;background:rgba(22,24,31,.55);display:grid;place-items:center;padding:16px;overflow:auto;`
const Box = styled.form`
  background:#fff;border:2px solid ${t.ink};border-radius:14px;width:min(560px,100%);padding:28px;
  display:grid;gap:14px;max-height:94vh;overflow:auto;h2{margin:0}
`
export const Modal = ({ onSubmit, children }) => (
  <Shade><Box onSubmit={onSubmit}>{children}</Box></Shade>
)
