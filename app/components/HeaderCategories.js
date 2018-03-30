import React, { Component } from 'react';
import { changeCurrentCategory } from '../actions';
import { CATEGORIES } from '../constants/defaults';
import { connect } from 'react-redux';

const Fragment = React.Fragment;

class HeaderCategories extends Component {
  handleCurrentCategory(categoryData, e){
    e.stopPropagation();
    this.props.dispatch(changeCurrentCategory({
      id: categoryData.id,
      type: 'click' // click, scroll
    }));

  }

  render() {

    let { locale, currentCategory } = this.props;

    return (
      <div className="header__categories">
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
    backgroundMode: state.backgroundMode,
    currentCategory: state.currentCategory,
    screenWidth: state.screenWidth
  }
};

export default connect(mapStateToProps)(HeaderCategories);
