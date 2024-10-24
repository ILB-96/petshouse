import React from 'react'

import { Product } from '../../../payload/payload-types'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'
import { SmallCard } from '../../_components/SmallCard'

export type ProductOptionsProps = {
  blockType: 'productOptions'
  blockName: string
  introContent?: any
  docs?: (string | Product)[]
  relationTo: 'products'
}

export const ProductOptions: React.FC<ProductOptionsProps> = props => {
  const { introContent, docs, relationTo } = props

  return (
    <div className={classes.relatedProducts}>
      {introContent && (
        <div className={classes.introContent}>
          <RichText content={introContent} />
        </div>
      )}
      <div className={classes.grid}>
        {docs?.map((doc, index) => {
          if (typeof doc === 'string') return null

          return (
            <div
              key={index}
              className={[
                classes.column,
                docs.length === 2 && classes['cols-half'],
                docs.length >= 3 && classes['cols-thirds'],
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <SmallCard relationTo={relationTo} doc={doc} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
