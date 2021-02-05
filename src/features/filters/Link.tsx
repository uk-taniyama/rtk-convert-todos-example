import React, { FC } from 'react'

export type LinkProps = {
  active: boolean
  filter: string
  setVisibilityFilter: (filter: string) => any
}

const Link: FC<LinkProps> = ({
  active,
  children,
  setVisibilityFilter,
  filter,
}) => (
  <button
    onClick={() => setVisibilityFilter(filter)}
    disabled={active}
    style={{
      marginLeft: '4px',
    }}
  >
    {children}
  </button>
)

export default Link
