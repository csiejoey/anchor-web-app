import { concave, convex, flat, pressed } from '@ssen/styled-neumorphism';
import { ActionButton } from 'components/ui/ActionButton';
import { HorizontalRuler } from 'components/ui/HorizontalRuler';
import { Section } from 'components/ui/Section';
import { TextButton } from 'components/ui/TextButton';
import { TextInput } from 'components/ui/TextInput';
import React from 'react';
import styled from 'styled-components';

export interface NeumorphismProps {
  className?: string;
}

function NeumorphismBase({ className }: NeumorphismProps) {
  return (
    <div className={className}>
      <div className="styles">
        <section className="flat">FLAT</section>
        <section className="concave">CONCAVE</section>
        <section className="convex">CONVEX</section>
        <section className="pressed">PRESSED</section>
      </div>

      <Section className="section">
        <div className="buttons">
          <TextButton>BUTTON</TextButton>
          <ActionButton>BUTTON</ActionButton>
        </div>

        <HorizontalRuler />

        <TextInput type="text" />
      </Section>
    </div>
  );
}

export const Neumorphism = styled(NeumorphismBase)`
  // ---------------------------------------------
  // style
  // ---------------------------------------------
  background-color: ${({ theme }) => theme.backgroundColor};

  .styles {
    section {
      border-radius: 20px;
      padding: 20px;

      text-align: center;
      color: ${({ theme }) => theme.textColor};

      &.flat {
        ${({ theme }) =>
          flat({
            color: theme.backgroundColor,
            distance: 6,
            intensity: theme.intensity,
          })};
      }

      &.concave {
        ${({ theme }) =>
          concave({
            color: theme.backgroundColor,
            distance: 6,
            intensity: theme.intensity,
          })};
      }

      &.convex {
        ${({ theme }) =>
          convex({
            color: theme.backgroundColor,
            distance: 6,
            intensity: theme.intensity,
          })};
      }

      &.pressed {
        ${({ theme }) =>
          pressed({
            color: theme.backgroundColor,
            distance: 6,
            intensity: theme.intensity,
          })};
      }
    }
  }

  margin-bottom: 1px;

  // ---------------------------------------------
  // layout
  // ---------------------------------------------
  .styles {
    display: flex;
    margin-bottom: 30px;
  }

  .section {
    .buttons {
      display: flex;

      button {
        flex: 1;

        &:first-child {
          margin-right: 15px;
        }
      }
    }

    hr {
      margin: 30px 0;
    }
  }

  // pc
  @media (min-width: 832px) {
    padding: 100px;
    
    .styles {
      section {
        flex: 1;
        
        &:not(:last-child) {
          margin-right: 30px;
        }
      }
    }
    
    .section {
      padding: 50px;
    }
  }

  // tablet
  @media (min-width: 512px) and (max-width: 831px) {
    padding: 30px;

    .styles {
      section {
        flex: 1;
        
        &:not(:last-child) {
          margin-right: 10px;
        }
      }
    }
    
    .section {
      padding: 30px;
    }
  }

  // mobile
  @media (max-width: 511px) {
    padding: 30px 20px;

    .styles {
      flex-direction: column;

      section {
        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }
    }
    
    .section {
      padding: 20px;
    }
  }
`;
