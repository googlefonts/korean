import React, { Component } from 'react';
import { CATEGORIES } from '../constants/defaults';
import { connect } from 'react-redux';
import { changeCategoryDropdownOpened, changeCurrentCategory} from '../actions';
import onClickOutside from "react-onclickoutside";
import _ from 'lodash';

class DropDownCategorySelector extends Component {
  handleCurrentCategory(categoryData){
    this.props.dispatch(changeCurrentCategory(categoryData.id));
    this.props.dispatch(changeCategoryDropdownOpened(false));
  }

  handleClickOutside(evt){ 

    _.delay(() => {
      this.props.dispatch(changeCategoryDropdownOpened(false));
    }, 100);

  }

  render() {
    let { currentCategory } = this.props;
    return (
      <div className="dropdown-category-selector">
        {
          _.map(CATEGORIES, categoryData => {
            return (
              <a className={`category-selector${ categoryData.id === currentCategory ? "--selected" : ""}`} onClick={this.handleCurrentCategory.bind(this, categoryData)} key={categoryData.id} href="javascript:void(0);">
                <div className="category-selector__label-ko">
                  {
                    categoryData.nameKo
                  }
                </div>
                <div className="category-selector__label-en">
                  {
                    categoryData.nameEn
                  }
                </div>
              </a>
            );
          })
        }
      </div>
    );
  }
}

let mapStateToProps = state => {
  return {
    currentCategory: state.currentCategory
  }
}
export default connect(mapStateToProps)(onClickOutside(DropDownCategorySelector));