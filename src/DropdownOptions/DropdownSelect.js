import React from 'react'
import Collapse from 'react-bootstrap/Collapse'
import Button from 'react-bootstrap/Button'

export default class DropdownSelect extends React.Component {
  constructor() {
    super()

    this.state = {
      open: false
    }
  }

  toggleItemAndCollapse(item) {
    const { toggleItem } = this.props
    this.setState({
      open: false
    })

    toggleItem(item)
  }

  render(){
    const { list, type, current } = this.props
    const { open } = this.state
    return(
      <>
        <Button className="col-12 rounded-0" variant="none" onClick={() => this.setState({ open: !open })}>
          <h5>{type} : {current || "All"}</h5>
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