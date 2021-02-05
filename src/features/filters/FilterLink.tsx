import { PropsWithChildren } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../../store'
import { setVisibilityFilter } from './filtersSlice'
import Link, { LinkProps } from './Link'

type OwnProps = Pick<LinkProps, 'filter'>

const mapStateToProps = (
  state: RootState,
  ownProps: PropsWithChildren<OwnProps>
) => ({
  ...ownProps,
  active: ownProps.filter === state.visibilityFilter,
})

const mapDispatchToProps = { setVisibilityFilter }

export default connect(mapStateToProps, mapDispatchToProps)(Link)
