import React from "react";
import * as PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./<%-ClassName%>.module.scss";
<% if (type === "class") { %>
export default class <%-ClassName%> extends React.Component {
  render() {
    return (
      <div className={classNames(styles.<%-className%>, className)}>
      </div>
    );
  }
}
<% } else { %>
export default function <%-ClassName%>({className, children}) {
  return (
    <div className={classNames(styles.<%-className%>, className)}>
      {children}
    </div>
  );
}

<%-ClassName%>.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};<% } %>
