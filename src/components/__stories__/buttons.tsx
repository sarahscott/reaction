import * as React from "react"
import * as Relay from "react-relay"
import { storiesOf, action } from "@kadira/storybook"

import Button, { ButtonStyle, ButtonState } from '../buttons/default'
import GhostButton from '../buttons/ghost'
import InvertedButton from '../buttons/inverted'

storiesOf("Buttons", Button)
    .add("Default Button", () => {
        return (
            <div>
                <div>
                    <Button>Button</Button>
                    <Button disabled>Button</Button>
                </div>
                <div>
                    <Button state={ButtonState.Success}>Button</Button>
                    <Button state={ButtonState.Success} disabled>Button</Button>
                </div>
                <div>
                    <Button state={ButtonState.Failure}>Button</Button>
                    <Button state={ButtonState.Failure} disabled>Button</Button>
                </div>
            </div>
        )
    })
    .add("Inverted Button", () => {
        return (
            <div>
                <div>
                    <InvertedButton>Inverted Button</InvertedButton>
                    <InvertedButton disabled>Button</InvertedButton>
                </div>
            </div>
        )
    })
    .add("Ghost Button", () => {
        return (
            <div>
                <div>
                    <GhostButton>Ghost Button</GhostButton>
                    <GhostButton disabled>Button</GhostButton>
                </div>
            </div>
        )
    })