import React from 'react';
import { P } from './';
import Layout from './layout';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // console.log({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <Layout>
          <P>Encontramos un error. Por favor intente cerrar y abrir el app. </P>
        </Layout>
      );
    }

    return this.props.children;
  }
}
