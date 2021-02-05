import { PropsWithChildren } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import { setVisibilityFilter } from './filtersSlice'
import Link, { LinkProps } from './Link'

type FilterLinkProps = Pick<LinkProps, 'filter'>

const mapStateToProps = (
  state: RootState,
  ownProps: PropsWithChildren<FilterLinkProps>
) => ({
  ...ownProps,
  active: ownProps.filter === state.visibilityFilter,
})

const mapDispatchToProps = { setVisibilityFilter }

export default connect(mapStateToProps, mapDispatchToProps)(Link)
