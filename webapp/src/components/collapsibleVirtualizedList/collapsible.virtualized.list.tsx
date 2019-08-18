import * as React from 'react';
import { AutoSizer, List, Index, ListRowProps } from 'react-virtualized';
import { Row } from '../../../../shared/log.types';
import { CVListRow } from './collapsible.row';

const LINE_HEIGHT=24;
const OVERSCAN_ROWS_COUNT=100;

type CVListProps = {
  listDataSource: Row[];
};

type CVListState = {
  rowHeightsMap: {
    [index: number]: number;
  };
};

export class CVList extends React.Component<CVListProps, CVListState> {
  listRef: (List | null) = null;
  rowIsExpandedMap: { [index: number]: boolean } = {};

  constructor(props: CVListProps) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      rowHeightsMap: {},
    });
  }

  setRef(listRef: List) {
    this.listRef = listRef;
  }

  onRowHeightChange(index: number, newHeight: number) {
    this.setState({
      rowHeightsMap: {
        ...this.state.rowHeightsMap,
        [index]: newHeight,
      }
    }, () => {
      if (this.listRef) {
        this.listRef.recomputeRowHeights()
        this.listRef.forceUpdate();
      } else {
        console.error('listRef is null');
      }
    });
  }

  getRowIsExpanded(index: number) {
    return !!this.rowIsExpandedMap[index];
  }

  onRowExpansionToggle(index: number) {
    this.rowIsExpandedMap[index] = !this.getRowIsExpanded(index);
  }

  rowRenderer(listRowProps: ListRowProps) {
    const { index, style } = listRowProps;
    return (
      <CVListRow
        key={index}
        index={index}
        style={style}
        lineHeight={LINE_HEIGHT}
        onRowHeightChange={(i, h) => this.onRowHeightChange(i, h)}
        lines={this.props.listDataSource[index].lines}
        header={this.props.listDataSource[index].header}
        onRowExpansionToggle={(i) => this.onRowExpansionToggle(i)}
        isExpanded={this.getRowIsExpanded(index)}
      />
    );
  }

  getRowHeight({index}: Index): number {
    if (this.state.rowHeightsMap[index]) {
      return this.state.rowHeightsMap[index];
    } else {
      return LINE_HEIGHT;
    }
  }

  scrollToLastRow() {
    const index = this.props.listDataSource.length - 1;
    if (this.listRef) {
      this.listRef.scrollToRow(index);
    }
  }

  componentDidUpdate() {
    this.scrollToLastRow();
  }

  render() {
    return (
      <AutoSizer>
        {
          ({width, height}) => 
          <List
            height={height}
            overscanRowCount={OVERSCAN_ROWS_COUNT}
            ref={this.setRef.bind(this)}
            rowHeight={this.getRowHeight.bind(this)}
            rowRenderer={this.rowRenderer.bind(this)}
            rowCount={this.props.listDataSource.length}
            width={width}
          />
        }
      </AutoSizer>
    );
  }
}
