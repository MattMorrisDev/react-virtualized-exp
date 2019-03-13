import React, {Component} from 'react';
import {AutoSizer, Column, InfiniteLoader, Table} from 'react-virtualized';
import {Loader} from '../Loader/Loader';


let remoteRowCount = 2000;

const generateRandomString = () =>
  Math.random()
    .toString(36)
    .substr(2, 10);


interface LocalState {
  list: Array<{ name: string }>;
  loading: boolean;
}


export class MainContent extends Component<any, LocalState> {

  constructor(props) {
    super(props);
    this.state = {
      loading: false, list: [
        {name: generateRandomString()},
        {name: generateRandomString()},
        {name: generateRandomString()},
        {name: generateRandomString()},
        {name: generateRandomString()},
        {name: generateRandomString()},
        {name: generateRandomString()},
        {name: generateRandomString()},
        {name: generateRandomString()},
        {name: generateRandomString()},
      ],
    }
  }

  getDataFromServer() {

    return new Promise(((resolve, reject) => {
      setTimeout(resolve, 1000);
    })).then(() => [
      {name: generateRandomString()},
      {name: generateRandomString()},
      {name: generateRandomString()},
      {name: generateRandomString()},
      {name: generateRandomString()},
      {name: generateRandomString()},
      {name: generateRandomString()},
      {name: generateRandomString()},
      {name: generateRandomString()},
      {name: generateRandomString()},
    ])
  };


  async loadMoreRows({startIndex, stopIndex}) {

    console.log('Loading rows: ', {startIndex, stopIndex});
    this.setState({loading: true});

    const newData = await this.getDataFromServer();

    console.log('Finished loading: ', {startIndex, stopIndex});
    this.setState({loading: false, list: [...this.state.list, ...newData]});
  }

  isRowLoaded({index}) {
    return !!this.state.list[index];
  }


  render() {
    return (
      <div style={{height: '100%'}}>
        {this.state.loading && <Loader/>}
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded.bind(this)}
          loadMoreRows={this.loadMoreRows.bind(this)}
          rowCount={remoteRowCount}
        >
          {({onRowsRendered, registerChild}) => (
            <AutoSizer>
              {({height, width}) => (
                <div>
                  <Table
                    headerHeight={20}
                    height={height}
                    autoHeight
                    rowGetter={({index}) => this.state.list[index]}
                    onRowsRendered={onRowsRendered}
                    ref={registerChild}
                    rowCount={this.state.list.length}
                    rowHeight={20}
                    width={width}
                  >
                    <Column
                      label='Name'
                      dataKey='name'
                      width={100}
                    />

                  </Table>
                </div>
              )}
            </AutoSizer>
          )}
        </InfiniteLoader>


      </div>
    );
  }
}
