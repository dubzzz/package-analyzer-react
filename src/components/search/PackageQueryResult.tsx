import React from 'react';

import './PackageQueryResult.css';
import Card from '@material-ui/core/Card/Card';
import CardContent from '@material-ui/core/CardContent/CardContent';
import Typography from '@material-ui/core/Typography/Typography';
import CardHeader from '@material-ui/core/CardHeader/CardHeader';
import Avatar from '@material-ui/core/Avatar/Avatar';
import { PackageSummary, SearchScore } from '../../api/npm/models';

interface Props {
  package: PackageSummary;
  score: SearchScore;
  searchScore: number;
  select: () => void;
}

function PackageQueryResult(props: Props) {
  const packageName = props.package.name;
  const authorName = props.package.author ? props.package.author.username : 'N.A';
  const scores = props.score.detail;
  const adjustedScores = {
    maintenance: Math.round(5 * scores.maintenance),
    popularity: Math.round(5 * scores.popularity),
    quality: Math.round(5 * scores.quality)
  };
  return (
    <Card className="package-card" onClick={() => props.select()}>
      <CardHeader
        className="card-header"
        avatar={
          <Avatar className="card-avatar" aria-label={packageName}>
            {packageName[0] || ''}
          </Avatar>
        }
        title={packageName}
        subheader={props.package.version}
      />
      <CardContent>
        <Typography color="textSecondary" gutterBottom>
          {authorName}
        </Typography>
        <Typography component="p">{props.package.description}</Typography>
        <div className="package-scores">
          <Avatar title="maintenance [0-5]" className={`package-score-${adjustedScores.maintenance}`}>
            {adjustedScores.maintenance}
          </Avatar>
          <Avatar title="popularity [0-5]" className={`package-score-${adjustedScores.popularity}`}>
            {adjustedScores.popularity}
          </Avatar>
          <Avatar title="quality [0-5]" className={`package-score-${adjustedScores.quality}`}>
            {adjustedScores.quality}
          </Avatar>
        </div>
      </CardContent>
    </Card>
  );
}

export default PackageQueryResult;
