import { Fragment } from 'react';
import { useSelector } from 'react-redux';

import CategoryPreview from '../../components/category-preview/category-preview.component';
import { selectCategoriesMap } from '../../store/category/category.selector';

const CategoriesPreview = () => {
  const selectCategories = useSelector(selectCategoriesMap);

  return (
    <Fragment>
      {Object.keys(selectCategories).map((title) => {
        const products = selectCategories[title];
        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </Fragment>
  );
};

export default CategoriesPreview;
