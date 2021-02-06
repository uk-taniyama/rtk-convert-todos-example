import { FC, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { bindActionCreators } from 'redux'
import { RootState } from '../../store'
import { setVisibilityFilter } from './filtersSlice'
import Link, { LinkProps } from './Link'

type FilterLinkProps = Pick<LinkProps, 'filter'>

const FilterLink: FC<FilterLinkProps> = ({ filter, ...props }) => {
  const visibilityFilter = useSelector(
    (state: RootState) => state.visibilityFilter
  )
  const active = visibilityFilter === filter
  const dispatch = useDispatch()
  const actions = useMemo(
    () => bindActionCreators({ setVisibilityFilter }, dispatch),
    [dispatch]
  )
  return (
    <Link
      filter={filter}
      active={active}
      setVisibilityFilter={actions.setVisibilityFilter}
      {...props}
    />
  )
}

export default FilterLink
