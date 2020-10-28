import React, { Component } from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component {

    state = { ...initialState }

    constructor(props) {
        super()
        this.clearMemory = this.clearMemory.bind(this)
        this.setOperation = this.setOperation.bind(this)
        this.addDigit = this.addDigit.bind(this)
    }

    clearMemory() {
        this.setState({ ...initialState })
    }

    setOperation(operation) {
        if (this.state.current === 0) {
            this.setState({ operation, current: 1, clearDisplay: true })
        } else {
            const equals = operation === '='
            const currentOperation = this.state.operation
            const values = [...this.state.values]
        
            const porcentageCalc = (porcentage, value_calc) => {
                let calc_final = parseFloat(porcentage * (value_calc / 100))
                return calc_final
            }

            const square_root = (num_calc) => {
                return Math.sqrt(num_calc).toFixed(1)
            }

            try {
                // values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`)
                switch (currentOperation) {
                    case '+':
                       values[0] += values[1]
                        break;
                    case '-':
                        values[0] -= values[1]                   
                        break
                    case '*':
                        values[0] *= values[1]                   
                        break
                    case '/':
                        values[0] /= values[1]                   
                        break    
                    case '%':
                        if (values[0] = porcentageCalc(values[0], values[1])) {
                            return values[0] = porcentageCalc(values[0], values[1])
                        } else {
                            values[0] = this.state.values[0]    
                        }                     
                        break
                    case '√':
                        if (values[0] = square_root(values[0])) {
                            return values[0] = square_root(values[0])
                        } else {
                            values[0] = this.state.values[0]
                        }
                        
                        break
                    default:
                        break;
                }

            } catch (e) {
                values[0] = this.state.values[0]
            }
            values[1] = 0

            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })

        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return
        }

        const clearDisplay = this.state.displayValue === '0'
            || this.state.clearDisplay
        const currentValue = clearDisplay ? '' : this.state.displayValue
        const displayValue = currentValue + n
        this.setState({ displayValue, clearDisplay: false })

        if (n !== '.') {
            const i = this.state.current
            const newValue = parseFloat(displayValue)
            const values = [...this.state.values]
            values[i] = newValue
            this.setState({ values })
        }
    }

    render() {
        return (
            <div className="box">
                <div className="calculator">
                    <Display value={this.state.displayValue} />
                    <Button label="C" click={this.clearMemory} clear/>
                    <Button label="√" click={this.setOperation} operation />
                    <Button label="%" click={this.setOperation} operation />
                    <Button label="/" click={this.setOperation} operation />
                    <Button label="7" click={this.addDigit} />
                    <Button label="8" click={this.addDigit} />
                    <Button label="9" click={this.addDigit} />
                    <Button label="*" click={this.setOperation} operation />
                    <Button label="4" click={this.addDigit} />
                    <Button label="5" click={this.addDigit} />
                    <Button label="6" click={this.addDigit} />
                    <Button label="-" click={this.setOperation} operation />
                    <Button label="1" click={this.addDigit} />
                    <Button label="2" click={this.addDigit} />
                    <Button label="3" click={this.addDigit} />
                    <Button label="+" click={this.setOperation} operation />
                    <Button label="0" click={this.addDigit} double />
                    <Button label="." click={this.addDigit} />
                    <Button label="=" click={this.setOperation} operation />
                </div>
            </div>

        )
    }
}