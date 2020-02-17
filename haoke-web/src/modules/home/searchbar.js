import React from 'react';
import {Icon, Pagination,Item, ItemDescription, ItemGroup, ItemImage, ItemMeta} from 'semantic-ui-react'
import ItemContent from "semantic-ui-react/dist/commonjs/views/Item/ItemContent";
import ItemHeader from "semantic-ui-react/dist/commonjs/views/Item/ItemHeader";
import './search.css'
class SearchBar extends React.Component {

    handlePageChange = (e,{activePage})=>{
        this.props.searchPage(null,{
            page:activePage
        })
    }

    hideSearchBar = () =>{
        this.props.hideSearchBar();
    }

  render() {
    return (
      <div className = 'search-bar' >
          <Icon onClick={this.hideSearchBar} name='angle left' size='large'/>
          {
              this.props.totalPage > 1 ? (
                  <Pagination
                      defaultActivePage={1}
                      firstItem={null}
                      lastItem={null}

                      totalPages={this.props.totalPage}
                      onPageChange={this.handlePageChange}
                      />
                      ):null
          }
          <div className = "search-bar-content">
          <ItemGroup divided unstackable>
              {
                  this.props.searchData.map(item=>{
                      return(
                          <Item key={item.id}>
                              <ItemImage src ={"http://image.haoke.com/images/"+item.image}/>
                              <ItemContent>
                                  <ItemHeader><div className='house-title'  dangerouslySetInnerHTML={{__html:item.title}}></div></ItemHeader>

                                  <ItemMeta>
                                      <span className='cinema'>{item.orientation}/{item.rentMethod}/{item.houseType}</span>
                                  </ItemMeta>
                                  <ItemDescription>上海</ItemDescription>
                                  <ItemDescription>{item.rent}￥</ItemDescription>
                              </ItemContent>
                          </Item>

                      )
                  })
              }
          </ItemGroup>
        </div>
      </div>
    );
  }
}
export default SearchBar;
