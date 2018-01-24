import { mount } from "enzyme"
import _ from "lodash"
import "jest-styled-components"
import React from "react"
import renderer from "react-test-renderer"
import {
  ArtworkRegular,
  ArtworkMissingInfo,
  ArtworkMultipleArtists,
} from "../../Fixtures/Components"
import { ArtworkCaption } from "../ArtworkCaption"

describe("ArtworkCaption", () => {
  const getWrapper = (props = {}) => {
    return mount(<ArtworkCaption artwork={props.artwork || ArtworkRegular} />)
  }

  describe("snapshot", () => {
    it("renders a fullscreen caption properly", () => {
      const caption = renderer
        .create(<ArtworkCaption artwork={ArtworkRegular} isFullscreenCaption />)
        .toJSON()
      expect(caption).toMatchSnapshot()
    })

    it("renders a classic caption properly", () => {
      const caption = renderer
        .create(<ArtworkCaption artwork={ArtworkRegular} layout="classic" />)
        .toJSON()
      expect(caption).toMatchSnapshot()
    })

    it("renders a standard caption properly", () => {
      const caption = renderer
        .create(<ArtworkCaption artwork={ArtworkRegular} layout="standard" />)
        .toJSON()
      expect(caption).toMatchSnapshot()
    })
  })

  describe("#joinParts", () => {
    it("joins zero items", () => {
      const component = getWrapper()
      const joined = component.instance().joinParts([])
      expect(joined.toString()).toEqual("")
    })

    it("joins one item", () => {
      const component = getWrapper()
      const joined = component.instance().joinParts(["Title"])
      expect(joined.toString()).toEqual("Title")
    })

    it("joins two items", () => {
      const component = getWrapper()
      const joined = component.instance().joinParts(["Title", "Date"])
      expect(joined.join("")).toEqual("Title, Date")
    })

    it("joins three items into a nested array", () => {
      const component = getWrapper()
      const joined = component
        .instance()
        .joinParts(["Title", "Date", "Partner"])
      expect(joined.length).toEqual(3)
      expect(joined[0][0]).toEqual("Title")
      expect(joined[0][2]).toEqual("Date")
      expect(joined[2]).toEqual("Partner")
    })
  })

  describe("render methods", () => {
    it("can render with missing information", () => {
      const component = getWrapper({
        artwork: ArtworkMissingInfo,
      })
      expect(component.text().length).toBe(0)
    })

    it("renders a single artist", () => {
      const component = getWrapper()
      expect(component.html()).toMatch("Fernando Botero")
    })

    it("renders artists", () => {
      const component = getWrapper({
        artwork: _.extend({}, ArtworkMultipleArtists, {
          artists: [{ name: "Andy Warhol" }, { name: "Botero" }],
        }),
      })
      expect(component.html()).toMatch(
        '<span class="name">Andy Warhol</span>, <span class="name">Botero</span></span>'
      )
    })

    it("renders title + date", () => {
      const component = getWrapper({
        artwork: ArtworkRegular,
      })
      expect(component.html()).toMatch(
        '<span class="title">Nude on the Beach</span>, <span class="date">2000</span></span>'
      )
    })

    it("renders partner + credit", () => {
      const component = getWrapper()
      expect(component.html()).toMatch(
        '<span>Gary Nader. <span class="credit">Courtesy of Gary Nader</span></span>'
      )
    })
  })
})
