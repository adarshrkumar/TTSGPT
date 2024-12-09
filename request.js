var fs = require('fs');
var path = require('path');
var request = require('request');
var OpenAI = require('openai');
const openai = new OpenAI();

// OpenAI API Key
var api_key = (my_secret = process.env['OPENAI_API_KEY']);

var fname = './speech.mp3'
const speechFile = path.resolve(fname);

async function newRequest(res, text_prompt, voice, model='hd') {
  model = `tts-1-${model}`
  if (model.endsWith('-')) model = model.substring(0, model.length - 1)
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${api_key}`,
  };

  const mp3 = await openai.audio.speech.create({
    model: model,
    voice: voice,
    input: text_prompt,
  });
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);
  res.send(fname)
}

exports.default = newRequest;