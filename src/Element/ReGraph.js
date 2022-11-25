import React, { Component } from 'react'
import { range } from 'mathjs';
import Plot from 'react-plotly.js';

export default class ReGraph extends Component {
    render() {
        let { x, y, title } = this.props;
        return (
            <Plot
                data={[
                    {
                        x: x.map(),
                        y: y.map(),
                        type: 'scatter',
                        marker: { color: 'red' },
                    },
                ]}
                layout={{ title: title }}
            />
        )
    }
}
