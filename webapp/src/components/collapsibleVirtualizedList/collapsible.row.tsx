import * as React from 'react';
import { Row } from '../../../../shared/log.types';
import './collapsible.row.css';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

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
export class CVListRow extends React.Component<CVListRowProps> {

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
      <div key={key}>
        {line}
      </div>
    );
  }

  render() {
    return (
      <div key={this.props.index} style={this.props.style} className={'RowWrapper'}>
        <div className={'Row'}>
          <span className={'Clickable ExpandIcon'} onClick={this.toggleExpanded.bind(this)}>
            {
              !this.props.isExpanded &&
              <ChevronRightIcon/>
            }
            {
              this.props.isExpanded &&
              <KeyboardArrowDownIcon/>
            }
          </span>
          <div className={'Text'}>
            {
              this.props.isExpanded ?
              this.props.lines.map(this.lineRender.bind(this)) :
              this.lineRender.bind(this)(this.props.header, 0)
            }
          </div>
        </div>
      </div>
    );
  }
}
