import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, ScrollView, View } from 'react-native';

const Twitter = props => {
 const { element } = props;
 const [embedHTML, setEmbedHTML] = useState(null);

  const setupEmbed = async() => {
    // pass in the Twitter Web URL
    //https://twitter.com/MMKK02887216
    let tweetUrl =
      "https://publish.twitter.com/oembed?url=" + encodeURIComponent('https://twitter.com/MMKK02887216');
    console.log('tweetUrl------------', tweetUrl);
    await fetch(tweetUrl, { method: "GET", headers: { Accepts: "application/json" } }).then(
      resp => {
        console.log('resp--------', resp);
        resp.json().then(json => {
          let html = json.html
          setEmbedHTML(html);
        })
      }
    )
  }

  useEffect(() => {setupEmbed()}, []);

  const renderEmbed = () => {
    console.log('embedHTML', embedHTML);
    if (embedHTML) {
      let html = `<!DOCTYPE html>\
        <html>\
          <head>\
            <meta charset="utf-8">\
            <meta name="viewport" content="width=device-width, initial-scale=1.0">\
            </head>\
            <body>\
              ${embedHTML}\
            </body>\
        </html>`
      return (
        <View style={styles.webviewWrap}>
          <WebView source={{ html: html }} style={styles.webview} />
        </View>
      )
    }
  }

  return (     
    <ScrollView style={{ height: 300 }}>
      {renderEmbed()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  webviewWrap: {
    flex: 1,
  },
  webview: {
    flex: 1,
    width: 300,
    height:  200, // height is hard to control
  },
});

export default Twitter;