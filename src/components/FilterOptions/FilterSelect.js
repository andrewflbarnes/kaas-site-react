import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'
import * as actions from '../../state/filters/action_creators'

export class RawFilterSelect extends React.PureComponent {
  constructor() {
    super()

    this.state = {
      open: false
    }
  }

  toggleItemAndCollapse(item) {
    const { updateNextFilter, type } = this.props
    this.setState({
      open: false
    })

    updateNextFilter(type, item)
  }

  render(){
    const { title, list, current } = this.props
    const { open } = this.state
    return(
      <>
        <Button className="col-12 rounded-0" variant="none" onClick={() => this.setState({ open: !open })}>
          <h5>{title} : {current || "All"}</h5>
        </Button>

        <Collapse in={this.state.open}>
          <div>
            <Button className="col-12 rounded-0" variant="dark-outline" onClick={() => this.toggleItemAndCollapse("")}>
              All
            </Button>
            {list.map(item => (
              <Button key={item} className="col-12 rounded-0" variant="dark-outline" onClick={() => this.toggleItemAndCollapse(item)}>
                {item}
              </Button>
            ))}
          </div>
        </Collapse>
      </>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(actions, dispatch);
};

const FilterSelect = connect(null, mapDispatchToProps)(RawFilterSelect);

export default FilterSelect