import React, { Component } from 'react'
import Item from '../../components/Item'
import { getAll as getItems } from '../../utils/itemsApi'

class DynamicPage extends Component {
  constructor() {
    super()
    this.state = {
      items: [],
    }
  }

  componentDidMount() {
    getItems()
      .then((items) => {
        this.setState({ items })
      })
  }

  render() {
    const { items } = this.state
    return (
      <div>
        {items.map(item => (
          <Item name={item.name} key={item.id} />
        ))}
      </div>
    )
  }
}

export default DynamicPage
