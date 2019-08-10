import * as React from 'react';
import { AutoSizer, List, Index, ListRowProps } from 'react-virtualized';

const LINE_HEIGHT=24;
const OVERSCAN_ROWS_COUNT=10;
type Row = {
  lines: string[];
}

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
    });
    if (this.listRef) {
      this.listRef.recomputeRowHeights();
      // this.listRef.forceUpdateGrid();
    } else {
      console.error('listRef is null');
    }
  }

  rowRenderer(listRowProps: ListRowProps) {
    const { index } = listRowProps;
    return (
      <CVListRow
        key={index}
        index={index}
        lineHeight={LINE_HEIGHT}
        onRowHeightChange={(i, h) => this.onRowHeightChange(i, h)}
        lines={this.props.listDataSource[index].lines}
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

/////////////////////////////////////////////////////////////////////////////////////////////

type CVListRowProps = Row & {
  index: number;
  lineHeight: number;
  onRowHeightChange: (index: number, newHeight: number) => void;
};
type CVListRowState = {
  isExpanded: boolean;
};

type RowOnClickHandler = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => any;

/**
 * A CVListRow is:
 * - Collapsible list row
 * - In collapsed state, it only shows the header line
 * - In un-collapsed state, it shows all the lines
 */
class CVListRow extends React.Component<CVListRowProps, CVListRowState> {

  constructor(props: CVListRowProps) {
    super(props);
  }

  componentWillMount() {
    this.setState({
      isExpanded: false,
    });
  }

  toggleExpanded(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    this.setState({
      isExpanded: !this.state.isExpanded,
    }, () => {
      this.props.onRowHeightChange(this.props.index, this.getRowHeight());
    });
  }

  getRowHeight(): number {
    return this.state.isExpanded ? 
    this.props.lines.length * this.props.lineHeight :
    this.props.lineHeight;
  }

  renderLine(key: any, line: string, onClickHandler: RowOnClickHandler | undefined = undefined) {
    const color = this.state.isExpanded ? 'cyan' : 'gray';
    return (
      <div onClick={onClickHandler} key={key} style={{'backgroundColor': color}}>
        {line}
      </div>
    );
  }

  lineRender(line: string, index: number) {
    const key = `${this.props.index}_${index}`;
    return (
      <div onClick={this.toggleExpanded.bind(this)} key={key}>
        {line}
      </div>
    );
  }

  render() {
    return (
      <div key={this.props.index}>
        {
          this.state.isExpanded ?
          this.props.lines.map(this.lineRender.bind(this)) :
          this.props.lines.slice(0, 1).map(this.lineRender.bind(this))
        }
      </div>
    );
  }
}
