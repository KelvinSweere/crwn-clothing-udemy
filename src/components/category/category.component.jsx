import React from 'react'

import "../category/category.style.scss"

class CategoryItem extends React.Component {
    constructor() {
        super();
        this.state = {
            subtitle: "Shop Now"
        };
    }

    render() {
      const {id, title, imageUrl} = this.props;
      return(
            <div key={id} className='category-container'>
            <div className='background-image' style={{
              backgroundImage: `url(${imageUrl})`
            }}/>
            <div className='category-body-container'>
              <h2>{title}</h2>
              <p>{this.state.subtitle}</p>
            </div>
          </div>
        )
    }
  }

export default CategoryItem;