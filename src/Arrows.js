import Arrow from './Arrow';

const Arrows = ({changeDirection}) => {
  return (
    <div className="arrows">
      <div className="first-row">
        <div className="arrow up-arrow" onClick={() => changeDirection('UP')}><Arrow /></div>
      </div>
      <div className="second-row">
        <div className="arrow left-arrow" onClick={() => changeDirection('LEFT')}><Arrow /></div>
        <div className="arrow down-arrow" onClick={() => changeDirection('DOWN')}><Arrow /></div>
        <div className="arrow right-arrow" onClick={() => changeDirection('RIGHT')}><Arrow /></div>
      </div>
    </div>
  )
}

export default Arrows
