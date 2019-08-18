import * as React from 'react';
import { Row } from '../../../../shared/log.types';

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
