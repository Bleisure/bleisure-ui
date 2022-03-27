import React from 'react'
import { SizeKey } from '../../../design/sizes'
import * as P from '../../../types/props'

// TODO: Test suites

namespace Sizable {
  export interface WithSize {
    size: SizeKey
  }

  interface DefaultProps extends WithSize {}

  interface RequiredProps {
    render: (p: ActualProps) => React.ReactElement
  }

  export interface PropTypes extends Partial<DefaultProps>, RequiredProps {}

  type ExcludeProperties = 'render'

  /**
   * @description ActualProps means what actually in `...props`
   */
  export type ActualProps = P.Exclude<P.Override<PropTypes, DefaultProps>, ExcludeProperties>

  const defaultProps: DefaultProps = {
    size: 'base',
  }

  export const Component = ({ render, ...props }: Readonly<PropTypes>) => {
    const actualProps: ActualProps = {
      ...defaultProps,
      ...props,
    }

    return render(actualProps)
  }
}

export default Sizable.Component

export type SizableProps = Sizable.ActualProps
