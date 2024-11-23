import React from 'react'
import {Checkbox} from '@qiwi/pijma-desktop'

export const CheckboxComponent: React.FC<any> = () => {
    const [checked, setChecked] = React.useState(true)
    return (
        <Checkbox
        onChange={(checked) => setChecked(checked)}
        checked={checked}
        data-testid="checkbox"
        label=""
      />
    )
}