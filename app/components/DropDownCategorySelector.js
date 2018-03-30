import React, { Component } from 'react';
import { CATEGORIES } from '../constants/defaults';
import { connect } from 'react-redux';
import { changeCategoryDropdownOpened, changeCurrentCategory} from '../actions';
import onClickOutside from "react-onclickoutside";
import _ from 'lodash';

const Fragment = React.Fragment;

class DropDownCategorySelector extends Component {
  handleCurrentCategory(categoryData, e){
    
    e.stopPropagation();
    this.props.dispatch(changeCurrentCategory({
      id: categoryData.id,
      type: 'click' // click, scroll
    }));

    this.props.dispatch(changeCategoryDropdownOpened(false));
  }

  handleClickOutside(evt){ 

    evt.stopPropagation();

    _.delay(() => {
      this.props.dispatch(changeCategoryDropdownOpened(false));
    }, 100);

  }

  render() {
    let { currentCategory, locale } = this.props;
    return (
      <div className="dropdown-category-selector">
        {
          _.map(CATEGORIES, categoryData => {
            return (
              <a className={`category-selector${ categoryData.id === currentCategory ? "--selected" : ""}`} onClick={this.handleCurrentCategory.bind(this, categoryData)} key={categoryData.id} href="javascript:void(0);">
                {
                  locale == "ko" ?
                  <Fragment>
                    <div className="category-selector__label-ko-left">
                      {
                        categoryData.nameKo
                      }
                    </div>
                    <div className="category-selector__label-en-right">
                      {
                        categoryData.nameEn
                      }
                    </div>
                  </Fragment> :
                  <Fragment>
                    <div className="category-selector__label-en-left">
                      {
                        categoryData.nameEn
                      }
                    </div>
                    <div className="category-selector__label-ko-right">
                      {
                        categoryData.nameKo
                      }
                    </div>
                  </Fragment>
                }
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
    locale: state.locale,
    currentCategory: state.currentCategory
  }
}
export default connect(mapStateToProps)(onClickOutside(DropDownCategorySelector));