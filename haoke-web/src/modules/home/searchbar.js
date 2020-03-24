import React from 'react';
import {Icon, Pagination,Item, ItemDescription, ItemGroup, ItemImage, ItemMeta,Label,Container} from 'semantic-ui-react'
import ItemContent from "semantic-ui-react/dist/commonjs/views/Item/ItemContent";
import ItemHeader from "semantic-ui-react/dist/commonjs/views/Item/ItemHeader";
import './search.css'
import {withRouter} from 'react-router-dom'
class SearchBar extends React.Component {

    constructor(props) {
        super(props);
    }
    handlePageChange = (e,{activePage})=>{
        this.props.searchPage(null,{
            page:activePage
        })
    }

    hideSearchBar = () =>{
        this.props.hideSearchBar();
    }
    handleHotSearch = (e,data) =>{
        this.props.searchPage(null,{value:data.children});
    }

  render() {
    return (
      <div className = 'search-bar' key="445">
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
          {
              this.props.hotWord?(
                  <Container>搜索结果太少，建议搜索：<br/>
                    <span>
                        {
                            this.props.hotWord.map(item=>{
                                return (
                                    <Label onClick={this.handleHotSearch}>{item}</Label>
                                )

                            })
                        }
                    </span>
                  </Container>
              ):null
          }
          <div className = "search-bar-content">
          <ItemGroup divided unstackable>
              {
                  this.props.searchData.map(item=>{
                      return(
                          <Item key={item.id} onClick={()=>this.props.history.push(`/detail/${item.id}`)}>
                              <ItemImage src ={"http://image.haoke.com:8081/images/"+item.image}/>
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
export default withRouter(SearchBar);
