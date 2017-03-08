import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Dialog, Paper, Divider, FloatingActionButton, FlatButton, RaisedButton} from 'material-ui';
import {Table, TableHeader, TableBody, TableHeaderColumn, TableRowColumn, TableRow} from 'material-ui/Table';
import ContentAdd from 'material-ui/svg-icons/content/add';
import globalStyles from '../../../styles';
import {
    listContracts,
    removeContract,
    removeContractToggle
} from '../../../redux/ducks/settings/otherContracts';
import styles from './styles';

const mapStateToProps = (state) => ({
    list: state.get('settingsOtherContracts').list,
    removeState: state.get('settingsOtherContracts').remove,
    selected: state.get('settingsOtherContracts').selected
});

const mapDispatchToProps = (dispatch) => ({
    getList: () => dispatch(listContracts()),
    removeToggle: (contract: AbstractOtherContractModel = null) => dispatch(removeContractToggle(contract)),
    remove: (contract: AbstractOtherContractModel) => dispatch(removeContract(contract)),
});

@connect(mapStateToProps, mapDispatchToProps)
class OtherContracts extends Component {
    componentDidMount() {
        this.props.getList();
    }

    render() {
        return (
            <Paper style={globalStyles.paper}>
                <h3 style={globalStyles.title}>Other contracts</h3>
                <Divider/>

                <FloatingActionButton style={styles.floatingActionButton}>
                    <ContentAdd />
                </FloatingActionButton>

                <Table>
                    <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                        <TableRow>
                            <TableHeaderColumn style={styles.columns.name}>Name</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.address}>Smart contract address</TableHeaderColumn>
                            <TableHeaderColumn style={styles.columns.action}>Action</TableHeaderColumn>
                        </TableRow>
                    </TableHeader>
                    <TableBody displayRowCheckbox={false}>
                        {this.props.list.entrySeq().map(([index, item]) =>
                            <TableRow key={index}>
                                <TableRowColumn style={styles.columns.name}>{item.name()}</TableRowColumn>
                                <TableRowColumn style={styles.columns.address}>{item.address()}</TableRowColumn>
                                <TableRowColumn style={styles.columns.action}>
                                    <RaisedButton label="Modify"
                                                  style={styles.actionButton}/>

                                    <RaisedButton label="Remove"
                                                  style={styles.actionButton}
                                                  onTouchTap={this.props.removeToggle.bind(null, item)}/>
                                </TableRowColumn>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <Dialog
                    title="Remove other contract"
                    actions={[
                          <FlatButton
                            label="Cancel"
                            primary={true}
                            onTouchTap={this.props.removeToggle.bind(null, null)}
                          />,
                          <FlatButton
                            label="Remove"
                            primary={true}
                            keyboardFocused={true}
                            onTouchTap={this.props.remove.bind(null, this.props.selected)}
                          />,
                        ]}
                    modal={false}
                    open={this.props.removeState}
                    onRequestClose={this.props.removeToggle.bind(null, null)}
                >
                    Do you really want to remove contract "{this.props.selected.name()}"
                    with address "{this.props.selected.address()}"?
                </Dialog>

                <div style={globalStyles.clear}/>
            </Paper>
        );
    }
}

export default OtherContracts;