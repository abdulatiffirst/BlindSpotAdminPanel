import styled from 'styled-components'
import { theme as t } from '@/styles/theme'

export const Button = styled.button`
  border:2px solid ${(p) => (p.$danger ? t.danger : t.ink)};color:${(p) => (p.$danger ? t.danger : t.ink)};
  background:${(p) => (p.$primary ? t.accent : '#fff')};padding:8px 16px;border-radius:8px;font-weight:700;cursor:pointer;
  &:disabled{opacity:.5;cursor:default}
`
export const Chip = styled.button`
  border:2px solid ${t.ink};border-radius:99px;padding:3px 12px;cursor:pointer;font-weight:500;
  background:${(p) => (p.$on ? t.accent : '#fff')};
`
