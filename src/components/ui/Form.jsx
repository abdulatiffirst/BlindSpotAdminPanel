import styled, { css } from 'styled-components'
import { theme as t } from '@/styles/theme'

const control = css`
  border: 2px solid ${t.line};
  border-radius: 8px;
  padding: 9px 12px;
  background: #fff;
  width: 100%;
`

export const Field = styled.label`display:grid;gap:4px;font-weight:500;`
export const Input = styled.input`${control}`
export const Select = styled.select`${control}`
export const TextArea = styled.textarea`${control}`
export const ErrorText = styled.p`color:${t.danger};margin:0;font-weight:500;`