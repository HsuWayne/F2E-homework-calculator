import { useState } from 'react'
import './App.scss'

function App() {
  const [data, setData] = useState(['0'])
  const [formulaShow, setFormulaShow] = useState('0')
  const [result, setResult] = useState(0)
  const handleOnClick = (e) => {
    switch (e) {
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        data[data.length - 1] = data[data.length - 1].replaceAll(',', '')
        if (isNaN(data[data.length - 1] % 1)) {
          data.push(e)
        } else {
          data[data.length - 1] === '0'
            ? (data[data.length - 1] = e)
            : (data[data.length - 1] = Number(
                data[data.length - 1] + e
              ).toLocaleString('en', {
                maximumFractionDigits: 8
              }))
        }
        setResult(0)
        setData(data)
        setFormulaShow(data.join(' '))
        break
      case '0':
      case '00':
        data[data.length - 1] = data[data.length - 1].replaceAll(',', '')
        if (isNaN(data[data.length - 1] % 1)) {
          data.push('0')
        } else if (
          data[data.length - 1] !== '0' &&
          data[data.length - 1].includes('.')
        ) {
          const index = data[data.length - 1].indexOf('.')
          const int = Number(
            data[data.length - 1].slice(0, index)
          ).toLocaleString('en', {
            maximumFractionDigits: 8
          })
          const float = data[data.length - 1].slice(index + 1) + e
          data[data.length - 1] = int + '.' + float
        } else {
          data[data.length - 1] = Number(
            data[data.length - 1] + e
          ).toLocaleString('en', {
            maximumFractionDigits: 8
          })
        }
        setResult(0)
        setData(data)
        setFormulaShow(data.join(' '))
        break
      case '.':
        data[data.length - 1] = data[data.length - 1].replaceAll(',', '')
        if (isNaN(data[data.length - 1] % 1)) {
          data.push('0.')
        } else {
          data[data.length - 1] = Number(data[data.length - 1]).toLocaleString(
            'en',
            {
              maximumFractionDigits: 8
            }
          )
          if (!data[data.length - 1].includes('.')) {
            data[data.length - 1] = data[data.length - 1] + e
          }
        }
        setResult(0)
        setData(data)
        setFormulaShow(data.join(' '))
        break
      case '÷':
      case '×':
      case '+':
      case '−':
        data[data.length - 1] = data[data.length - 1].replaceAll(',', '')
        if (data[data.length - 1] !== '0') {
          if (isNaN(data[data.length - 1] % 1)) {
            data[data.length - 1] = e
          } else {
            data[data.length - 1] = Number(
              data[data.length - 1]
            ).toLocaleString('en', {
              maximumFractionDigits: 8
            })
            data.push(e)
          }
        }
        setData(data)
        setFormulaShow(data.join(' '))
        setResult(0)
        break
      case 'AC':
        setResult(0)
        setData(['0'])
        setFormulaShow('0')
        break
      case '⌫':
        data[data.length - 1] = data[data.length - 1].replaceAll(',', '')
        if (data.length === 1 && data[data.length - 1].length === 1) {
          data[data.length - 1] = '0'
        } else if (data[data.length - 1].length === 1) {
          data.pop()
        } else if (data[data.length - 1].includes('.')) {
          const index = data[data.length - 1].indexOf('.')
          if (index === data[data.length - 1].length - 1) {
            data[data.length - 1] = Number(
              data[data.length - 1].slice(0, -1)
            ).toLocaleString('en', {
              maximumFractionDigits: 8
            })
          } else {
            const int = Number(
              data[data.length - 1].slice(0, index)
            ).toLocaleString('en', {
              maximumFractionDigits: 8
            })
            const float = data[data.length - 1].slice(index + 1, -1)
            data[data.length - 1] = int + '.' + float
          }
        } else {
          data[data.length - 1] = Number(
            data[data.length - 1].slice(0, -1)
          ).toLocaleString('en', {
            maximumFractionDigits: 8
          })
        }
        setData(data)
        setFormulaShow(data.join(' '))
        break
      default:
        break
    }
  }
  const newEvil = (fn) => {
    var Fn = Function
    return new Fn('return ' + fn)()
  }
  const handleOnCalc = () => {
    const newResult = newEvil(
      formulaShow
        .replaceAll('−', '-')
        .replaceAll('×', '*')
        .replaceAll('÷', '/')
        .replaceAll(',', '')
    ).toLocaleString('en', {
      maximumFractionDigits: 8
    })
    setResult(newResult)
    setData(['0'])
  }
  return (
    <main className='container'>
      <div className='header'>
        <div className='formula'>{formulaShow}</div>
        <div className='result'>{result}</div>
      </div>
      <div className='body'>
        <div className='btn' onClick={() => handleOnClick('7')}>
          7
        </div>
        <div className='btn' onClick={() => handleOnClick('8')}>
          8
        </div>
        <div className='btn' onClick={() => handleOnClick('9')}>
          9
        </div>
        <div className='btn btn-operator' onClick={() => handleOnClick('÷')}>
          ÷
        </div>
        <div className='btn' onClick={() => handleOnClick('4')}>
          4
        </div>
        <div className='btn' onClick={() => handleOnClick('5')}>
          5
        </div>
        <div className='btn' onClick={() => handleOnClick('6')}>
          6
        </div>
        <div className='btn btn-operator' onClick={() => handleOnClick('×')}>
          ×
        </div>
        <div className='btn' onClick={() => handleOnClick('1')}>
          1
        </div>
        <div className='btn' onClick={() => handleOnClick('2')}>
          2
        </div>
        <div className='btn' onClick={() => handleOnClick('3')}>
          3
        </div>
        <div className='btn btn-operator' onClick={() => handleOnClick('+')}>
          +
        </div>
        <div className='btn' onClick={() => handleOnClick('0')}>
          0
        </div>
        <div className='btn' onClick={() => handleOnClick('00')}>
          00
        </div>
        <div className='btn' onClick={() => handleOnClick('.')}>
          .
        </div>
        <div className='btn btn-operator' onClick={() => handleOnClick('−')}>
          −
        </div>
        <div className='btn btn-delete' onClick={() => handleOnClick('AC')}>
          AC
        </div>
        <div className='btn btn-delete' onClick={() => handleOnClick('⌫')}>
          ⌫
        </div>
        <div className='btn btn-equal' onClick={() => handleOnCalc()}>
          =
        </div>
      </div>
    </main>
  )
}

export default App
