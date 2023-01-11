import React from 'react'
import CategoryItem from "../../routes/category/category.component";

import "../category-menu/category-menu.component.scss"

class CategoryMenu extends React.Component {
    render() {
        return(
          <div className='categories-container'>
          {
            (this.props.categories).map(({id, title, imageUrl}) => {
              return(
                  <CategoryItem key={id} id={id} title={title} imageUrl={imageUrl}></CategoryItem>
              );
            })
          }
        </div>
        )
    }
}
  
export default CategoryMenu;