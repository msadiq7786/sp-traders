"use client";

import { MoreHorizontal, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useProducts } from "@/features/products/hooks/queries";
import { useDeleteProduct } from "@/features/products/hooks/mutation";
import { ProductForm } from "@/features/products/product-form";
import { Product } from "@/features/products/types";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";

export default function ProductsPage() {
  const [open, setOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const { data, isLoading, isError, error } = useProducts();

  const products = data?.data?.products ?? [];
  const totalProducts = data?.data?.totalProducts ?? 0;

  const deleteProduct = useDeleteProduct();

  const handleDelete = (productId: string) => {
    deleteProduct.mutate(productId);
  };

  return (
    <div className="px-4 sm:px-6">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Products{" "}
            <span className="text-muted-foreground">({totalProducts})</span>
          </h1>

          <p className="text-sm text-muted-foreground">Manage your products</p>
        </div>

        <Button
          onClick={() => {
            setSelectedProduct(undefined);
            setOpen(true);
          }}
        >
          <Plus className="mr-2 size-4" />
          Add Product
        </Button>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>
                {selectedProduct ? "Edit Product" : "Add Product"}
              </DialogTitle>

              <DialogDescription>
                {selectedProduct
                  ? "Update the product details."
                  : "Add a new product to your product catalog."}
              </DialogDescription>
            </DialogHeader>

            <ProductForm
              product={selectedProduct}
              onSuccess={() => setOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading && (
        <div className="flex h-32 items-center justify-center rounded-md border">
          <p className="text-sm text-muted-foreground">Loading products...</p>
        </div>
      )}

      {isError && (
        <div className="rounded-md border p-6">
          <p className="text-sm text-destructive">
            {error.message || "Failed to load products"}
          </p>
        </div>
      )}

      {!isLoading && !isError && (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Code</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {products.length > 0 ? (
                products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell className="font-medium capitalize">
                      {product.name}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {product.code}
                    </TableCell>

                    <TableCell>
                      {product.isActive ? (
                        <Badge variant="default">Active</Badge>
                      ) : (
                        <Badge variant="secondary">Inactive</Badge>
                      )}
                    </TableCell>

                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger
                          render={
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="size-4" />

                              <span className="sr-only">Product actions</span>
                            </Button>
                          }
                        />

                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedProduct(product);
                              setOpen(true);
                            }}
                          >
                            Edit Product
                          </DropdownMenuItem>

                          <DropdownMenuItem
                            variant="destructive"
                            disabled={deleteProduct.isPending}
                            onClick={() => handleDelete(product._id)}
                          >
                            Delete Product
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="h-24 text-center">
                    No products found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
