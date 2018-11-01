import React from 'react';

import './PackageQueryResult.css';
import { PackageSearchResult } from '../redux/sagas/PackageApi';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import CardHeader from '@material-ui/core/CardHeader/CardHeader';
import Avatar from '@material-ui/core/Avatar/Avatar';

interface Props {
  package: PackageSearchResult['package'];
  score: PackageSearchResult['score'];
  searchScore: PackageSearchResult['searchScore'];
}
type State = {};

class PackageQueryResult extends React.Component<Props, State> {
  render() {
    const packageName = this.props.package.name;
    const authorName = this.props.package.author ? this.props.package.author.name : 'N.A';
    const scores = this.props.score.detail;
    const adjustedScores = {
      maintenance: Math.round(5 * scores.maintenance),
      popularity: Math.round(5 * scores.popularity),
      quality: Math.round(5 * scores.quality)
    };
    return (
      <Card>
        <CardHeader
          className="card-header"
          avatar={
            <Avatar className="card-avatar" aria-label={packageName}>
              {packageName[0] || ''}
            </Avatar>
          }
          title={packageName}
          subheader={this.props.package.version}
        />
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            {authorName}
          </Typography>
          <Typography component="p">{this.props.package.description}</Typography>
          <p className="package-scores">
            <Avatar title="maintenance [0-5]" className={`package-score-${adjustedScores.maintenance}`}>
              {adjustedScores.maintenance}
            </Avatar>
            <Avatar title="popularity [0-5]" className={`package-score-${adjustedScores.popularity}`}>
              {adjustedScores.popularity}
            </Avatar>
            <Avatar title="quality [0-5]" className={`package-score-${adjustedScores.quality}`}>
              {adjustedScores.quality}
            </Avatar>
          </p>
        </CardContent>
      </Card>
    );
  }
}

export default PackageQueryResult;
