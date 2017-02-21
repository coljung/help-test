import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';
import Board from '../components/Board';
import { Table, Icon, Button, Spin, Pagination } from 'antd';
import { fetchStores } from './storeActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

// styles
import '../styles/stores';

const fixDate = ((myDate) => {
    let fixedDate = new Date(myDate);
    fixedDate = `${fixedDate.getMonth() + 1} / ${fixedDate.getDate()} / ${fixedDate.getFullYear()}`;
    return fixedDate;
});

class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
           stores: [],
           loading: true,
        };
        this.handleClick = this.handleClick.bind(this);
        this.columns = [
            {
                title: 'id',
                dataIndex: 'id',
                key: 'id',
            }, {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                // render: (text, record) => (<a href={record.id}>{text}</a>),
            }, {
                title: 'Last Updated',
                dataIndex: 'updated_at',
                key: 'updated_at',
                render: text => (fixDate(text).toString()),
            }, {
                title: 'Action',
                key: 'action',
                render: record => (
                    <Link to={`/admin/stores/${record.id}`}>
                        <Button size="large">
                            <Icon type="edit" /> Edit Store
                        </Button>
                    </Link>
                ),
            },
        ];
    }

    buildPagination() {
        if (this.props.pagination) {
            return {
                total: this.props.pagination.total,
                pageSize: this.props.pagination.per_page,
                onChange: (current) => {
                    this.props.fetchStores(current);
                },
            };
        }
        return {};
    }

    componentWillMount() {
        this.props.fetchStores();
    }

    componentWillReceiveProps(props) {
        this.setState({
            stores: props.stores,
        });
    }

    handleClick(url) {
        browserHistory.push(url);
    }

    createTable() {
        return (
            <Table rowKey={record => record.id}
                   columns={this.columns}
                   dataSource={this.state.stores}
                   size="middle"
                   pagination={this.buildPagination()} />
        );
    }

    loadingContent() {
        return (
            <div className="loadingContainer"></div>
        );
    }

    render() {
        const btnNew = (<Button type="primary" className="ant-btn-xl" onClick={() => this.handleClick('/admin/stores/new')}>
            <Icon type="plus-circle-o" /> Create new Store
        </Button>);
        console.log(this.state.stores.length, this.props.fetchReady);
        // const stores = this.state.stores.length ? this.createTable() : this.loadingContent();
        return (
            <div>
                <Board title={'Stores'} btnInTitle={btnNew}>
                    <Table rowKey={record => record.id}
                           columns={this.columns}
                           dataSource={this.state.stores}
                           size="middle"
                           loading={true}
                           pagination={this.buildPagination()} />
                </Board>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { storeReducer } = state;
    return {
        stores: storeReducer.stores.collection,
        fetchReady: storeReducer.fetchReady,
        pagination: storeReducer.stores.meta,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ fetchStores }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StoreList);
