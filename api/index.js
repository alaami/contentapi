// The main, exported, function of the endpoint,
// dealing with the request and subsequent response
module.exports = async (req, res) => {
  res.status(200).json({ 'ok':'oui' })
}