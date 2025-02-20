import React, { useEffect, useState } from 'react';
import { WebView } from 'react-native-webview';
import { StyleSheet, ScrollView, View } from 'react-native';
import FieldLabel from '../../common/FieldLabel';
import formStore from '../../store/formStore';

const Twitter = props => {
 const { element } = props;
 const [embedHTML, setEmbedHTML] = useState(null);
 const i18nValues = formStore(state => state.i18nValues);

  const setupEmbed = async() => {
    // pass in the Twitter Web URL
    //https://twitter.com/MMKK02887216
    let tweetUrl =
      "https://publish.twitter.com/oembed?url=" + encodeURIComponent(element.meta.tweetUrl);
    await fetch(tweetUrl, { method: "GET", headers: { Accepts: "application/json" } }).then(
      resp => {
        resp.json().then(json => {
          let html = json.html
          setEmbedHTML(html);
        })
      }
    )
  }

  useEffect(() => {setupEmbed()}, [element.meta.tweetUrl]);

  const renderEmbed = () => {
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
    <ScrollView style={{ height: 350, width: '100%', padding: 5 }}>
      <FieldLabel label={element.meta.title || i18nValues.t("field_labels.twitter")} visible={!element.meta.hide_title} />
      {renderEmbed()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  webviewWrap: {
    flex: 1,
    width: '100%',
    height: 300,
    backgroundColor: 'red',
  },
  webview: {
    flex: 1,
    width: '100%',
    height:  300, // height is hard to control
  },
});

export default Twitter;