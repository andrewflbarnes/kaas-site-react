import React from 'react'
import DropdownSelect from './DropdownSelect'
import Button from 'react-bootstrap/Button';

export default function DropdownOptions({
  competitions, handleCompetitionToggle, competition,
  seasons, handleSeasonToggle, season,
  leagues, handleLeagueToggle, league,
  handleApplyFilters, handleCancelFilters
}) {
  return (
    <>
      <DropdownSelect type="Competition" list={competitions} toggleItem={handleCompetitionToggle} current={competition}/>
      <DropdownSelect type="Season" list={seasons} toggleItem={handleSeasonToggle} current={season}/>
      <DropdownSelect type="League" list={leagues} toggleItem={handleLeagueToggle} current={league}/>
      <div className="col-4 offset-4">
        <Button className="col-5 mx-1" variant="outline-success" onClick={handleApplyFilters}>Apply</Button>
        <Button className="col-5 mx-1" variant="outline-danger" onClick={handleCancelFilters}>Cancel</Button>
      </div>
    </>
  )
}