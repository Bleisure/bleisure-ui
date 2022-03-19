import { createGlobalStyle, css, StyledConfig } from 'styled-components'

export const Styled = createGlobalStyle`
* {
    @import url('../../../assets/styles/font.css');
    font-family: Gilroy !important;
  }
`
export type StyledComponentConfigType = <P extends Object = {}>(
  as: Array<keyof P>,
) => StyledConfig<P>

export const styledComponentConfig: StyledComponentConfigType = (as) => ({
  shouldForwardProp: (prop, defaultValidatorFn) => !as.includes(prop) && defaultValidatorFn(prop),
  /**
   * @TODO
   *
   * componentId
   * displayName
   */
})
