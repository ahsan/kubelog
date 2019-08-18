import * as React from 'react';
import { AutoSizer, List, Index, ListRowProps } from 'react-virtualized';
import { Row } from '../../../../shared/log.types';

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

/////////////////////////////////////////////////////////////////////////////////////////////

type CVListRowProps = Row & {
  index: number;
  lineHeight: number;
  onRowHeightChange: (index: number, newHeight: number) => void;
  onRowExpansionToggle: (index: number) => void;
  style: React.CSSProperties;
  isExpanded: boolean;
};

/**
 * A CVListRow is:
 * - Collapsible list row
 * - In collapsed state, it only shows the header line
 * - In un-collapsed state, it shows all the lines
 */
class CVListRow extends React.Component<CVListRowProps> {

  constructor(props: CVListRowProps) {
    super(props);
  }

  toggleExpanded(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    this.props.onRowExpansionToggle(this.props.index);
    const { lines: { length }, lineHeight } = this.props;
    const { isExpanded } = this.props;
    const height = !isExpanded ? length * lineHeight : lineHeight;
    this.props.onRowHeightChange(this.props.index, height);
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
      <div key={this.props.index} style={this.props.style}>
        {
          this.props.isExpanded ?
          this.props.lines.map(this.lineRender.bind(this)) :
          this.lineRender.bind(this)(this.props.header, 0)
        }
      </div>
    );
  }
}
