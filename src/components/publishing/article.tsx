import { cloneDeep, includes, map } from "lodash"
import * as PropTypes from "prop-types"
import * as React from "react"
import Header from "./header/header"
import FeatureLayout from "./layouts/feature_layout"
import Sidebar from "./layouts/sidebar"
import StandardLayout from "./layouts/standard_layout"
import RelatedArticles from "./related_articles"
import FullscreenViewer from "./sections/fullscreen_viewer/fullscreen_viewer"
import Sections from "./sections/sections"
import Share from "./share"
import { ArticleData } from "./typings"

export interface ArticleProps {
  article: ArticleData
  relatedArticles?: any
}
interface ArticleState {
  viewerIsOpen: boolean
  slideIndex: number
  fullscreenImages: any
  article: any
}

class Article extends React.Component<ArticleProps, ArticleState> {
  static childContextTypes = {
    onViewFullscreen: PropTypes.func,
  }

  constructor(props) {
    super(props)
    const { fullscreenImages, article } = this.indexAndExtractImages()
    this.state = {
      viewerIsOpen: false,
      slideIndex: 0,
      fullscreenImages,
      article,
    }
  }

  getChildContext() {
    return { onViewFullscreen: this.openViewer }
  }

  openViewer = index => {
    this.setState({
      viewerIsOpen: true,
      slideIndex: index,
    })
  }

  closeViewer = () => {
    this.setState({ viewerIsOpen: false })
  }

  indexAndExtractImages = () => {
    const article = cloneDeep(this.props.article)
    const fullscreenImages = []
    let sectionIndex = 0
    const newSections = map(article.sections, section => {
      if (includes(["image_collection", "image_set"], section.type)) {
        const newImages = map(section.images, image => {
          image.setTitle = section.title
          image.index = sectionIndex
          fullscreenImages.push(image)
          sectionIndex = sectionIndex + 1
          return image
        })
        section.images = newImages
      }
      return section
    })
    article.sections = newSections
    return { fullscreenImages, article }
  }

  render() {
    const { relatedArticles } = this.props
    const article = this.state.article
    if (article.layout === "feature") {
      return (
        <div>
          <Header article={article} />
          <FeatureLayout>
            <Sections article={article} />
          </FeatureLayout>
          <FullscreenViewer
            onClose={this.closeViewer}
            show={this.state.viewerIsOpen}
            slideIndex={this.state.slideIndex}
            images={this.state.fullscreenImages}
          />
        </div>
      )
    } else {
      const relatedArticleSection = relatedArticles.length
        ? <RelatedArticles label={"Related Stories"} articles={relatedArticles} />
        : false
      return (
        <div>
          <Header article={article} />
          <StandardLayout>
            <Sections article={article} />
            <Sidebar>
              <Share url={article.slug} title={article.social_title || article.thumbnail_title} />
              {relatedArticleSection}
            </Sidebar>
          </StandardLayout>
          <FullscreenViewer
            onClose={this.closeViewer}
            show={this.state.viewerIsOpen}
            slideIndex={this.state.slideIndex}
            images={this.state.fullscreenImages}
          />
        </div>
      )
    }
  }
}

export default Article
