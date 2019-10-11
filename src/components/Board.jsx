import React from 'react';
import { connect } from 'react-redux';

const Board = () => <div>Hello Board</div>;

// export default Todo;
export default connect(
  null,
  null
)(Board);
